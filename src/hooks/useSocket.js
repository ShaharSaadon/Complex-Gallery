import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../services/http.service.js";

export function useSocket(paintingId, setPainting, setIsTeacher) {
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);

        socketRef.current.on("connect", () => {
            socketRef.current.emit("join room", paintingId);
        });

        socketRef.current.on("is teacher", (isTeacher) => {
            setIsTeacher(isTeacher);
        });

        socketRef.current.on("code change", (updatedPainting) => {
            if (updatedPainting._id === paintingId) {
                setPainting(updatedPainting);
            }
        });

        return () => {
            socketRef.current.emit("leave room", paintingId);
            socketRef.current.disconnect();
        };
    }, [paintingId, setPainting, setIsTeacher]);

    return socketRef.current;
}
