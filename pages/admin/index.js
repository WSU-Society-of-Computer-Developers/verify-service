import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Home.module.css'
import { connect } from '../../db/connect';
import Entry from '../../db/models';
import Header from '../../comps/Header';

export async function getStaticProps() {
    let entries;
    try {
        await connect()
        entries = await Entry.find({}, { _id: 0 })
    } catch (err) {
        let disp = err.toString()
        entries = [{ "Status": false, "Error": disp.includes("ENOTFOUND") ? "Server is still initializing (not ready)." : disp }]
    }
    return {
        props: {
            entries: JSON.stringify(entries)
        },
        revalidate: 60 * 3 // 3 min
    }
}

export default function admin({ entries }) {
    let data = JSON.parse(entries)
    let headings = new Set()
    for (let e of data) { // get outermost props in mongodb documents
        for (let f of Object.keys(e)) {
            headings.add(f)
        }
    }
    headings = Array.from(headings)
    return (
        <div className={styles.container}>
            <Header />
            <main className="container">
                <table>
                    <thead>
                        <tr>
                            {headings.map((head) => <th key={head} scope='col'>{head}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry) => <tr key={entry.AccessID}>
                            {Object.values(entry).map((val) => <td key={`${entry.AccessID}-${val}`}>{val}</td>)}
                        </tr>)}
                    </tbody>
                </table>
            </main>
        </div>
    )
}
