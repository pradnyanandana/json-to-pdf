import Head from "next/head";
import styles from "../styles/Home.module.css";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import PDFViewer from "./pdf";
import ReactToPrint from "react-to-print";

const Home = () => {
    const [json, setJSON] = useState();
    const [valid, setValid] = useState(true);
    const [settings, setSettings] = useState({});

    let printComponentRef = useRef();

    const handleFileChange = (e) => {
        const reader = new FileReader();

        if (e.target.files) {
            const file = e.target.files[0];
            reader.readAsText(file, "UTF-8");

            reader.onload = (evt) => {
                try {
                    JSON.parse(evt.target.result);
                    setValid(true);
                    setJSON(evt.target.result);
                } catch (e) {
                    setValid(false);
                }
            };
        }
    };

    const handleLogoChange = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                setSettings({ ...settings, logo: e.target.result });
            };

            reader.readAsDataURL(file);
        }
    };

    const editorOnChange = (value) => {
        try {
            JSON.parse(value);
            setValid(true);
            setJSON(value);
        } catch (e) {
            setValid(false);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>JSON to PDF || Pradnyanandana</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <section className="site-title">
                    <h1 className={styles.title}>JSON to PDF</h1>
                </section>
                <section className="file-form">
                    <h3>Select File</h3>
                    <input type="file" id="myFile" name="filename" accept="application/json" onChange={handleFileChange}></input>
                    {!valid && <p className="warning">Not a valid JSON</p>}
                </section>
                <section className="json-editor">
                    <h3>JSON Editor</h3>
                    <Editor height="20rem" defaultLanguage="json" theme="vs-dark" value={json} onChange={editorOnChange} />
                </section>
                <section className="configure">
                    <h3>Configure</h3>
                    <div className="form-input">
                        <label>Document Name</label>
                        <input type="text"></input>
                    </div>
                    <div className="form-input">
                        <label>Logo</label>
                        <input type="file" id="logo" name="logo" accept="image/png,image/jpeg" onChange={handleLogoChange}></input>
                    </div>
                </section>
                <section className="generate">
                    <h3>Generate</h3>
                    <PDFViewer printRef={(el) => (printComponentRef = el)} dataJSON={json} settings={settings} />
                    {json ? <ReactToPrint trigger={() => <button>Generate PDF</button>} content={() => printComponentRef} /> : <button>Generate PDF</button>}
                </section>
            </main>

            <footer>
                <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
                    ©2023 Pradnyanandana
                </a>
            </footer>

            <style jsx>{`
                main {
                    padding: 5rem 0rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    gap: 2rem;
                    width: 100%;
                    max-width: 768px;
                }
                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                footer img {
                    margin-left: 0.5rem;
                }
                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    color: inherit;
                }
                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
                }
                section {
                    width: 100%;
                }
                button {
                    padding: 0.5rem 1rem;
                    font-weight: bold;
                    color: #fff;
                    background-color: #000;
                    border-radius: 5px;
                    border: none;
                    cursor: pointer;
                }
                p.warning {
                    color: #ff0000;
                }
                .site-title {
                    text-align: center;
                }
                .json-editor pre {
                    width: 100%;
                }
                .configure .form-input {
                    display: flex;
                    gap: 2rem;
                }
                .configure .form-input:not(:last-child) {
                    margin-bottom: 1rem;
                }
                .configure .form-input label {
                    flex: 0 0 20%;
                }
                .generate iframe {
                    display: block;
                    width: 100%;
                }
                .generate button {
                    display: block;
                    margin-top: 1rem;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
};

export default Home;
