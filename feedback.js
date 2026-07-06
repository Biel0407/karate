import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function tempoRelativo(timestamp) {
    if (!timestamp || !timestamp.toDate) return "";

    const agora = new Date();
    const data = timestamp.toDate();

    const diff = Math.floor((agora - data) / 1000);

    if (diff < 60) return "agora mesmo";
    if (diff < 3600) return `há ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`;
    return `há ${Math.floor(diff / 86400)} dia(s)`;
}

function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [mostrarTodos, setMostrarTodos] = useState(false);

    useEffect(() => {
        let qRef;

        if (mostrarTodos) {
            qRef = query(
                collection(db, "feedbacks"),
                orderBy("createdAt", "desc")
            );
        } else {
            qRef = query(
                collection(db, "feedbacks"),
                orderBy("createdAt", "desc"),
                limit(5)
            );
        }

        const unsubscribe = onSnapshot(qRef, (snapshot) => {
            const dados = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setFeedbacks(dados);
        });

        return () => unsubscribe();
    }, [mostrarTodos]);

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2>Feedbacks</h2>

            {/* LISTA DE FEEDBACKS */}
            {feedbacks.length === 0 ? (
                <p>Nenhum comentário ainda.</p>
            ) : (
                feedbacks.map(item => (
                    <div
                        key={item.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "8px"
                        }}
                    >
                        <p><strong>{item.nome || "Anônimo"}</strong></p>
                        <p>{item.mensagem}</p>

                        <p style={{ fontSize: "12px", color: "gray" }}>
                            {tempoRelativo(item.createdAt)}
                        </p>
                    </div>
                ))
            )}

            {/* BOTÃO VER MAIS / MENOS */}
            <button
                onClick={() => setMostrarTodos(!mostrarTodos)}
                style={{
                    marginTop: "15px",
                    padding: "8px 12px",
                    cursor: "pointer"
                }}
            >
                {mostrarTodos ? "Mostrar menos" : `Ver todos (${feedbacks.length})`}
            </button>
        </div>
    );
}

export default Feedbacks;
