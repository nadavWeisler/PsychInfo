"use client";
import { db } from "@/app/firebase/app";
import { ref, set, remove, update, get } from "firebase/database";

interface DataForDB {
    title: string;
    content: string;
    link: string;
    organization: string;
    relevantTags: string[];
}

export const writeToDB = (path: string, data: DataForDB) => {
    set(ref(db, path), data);
};

export const getDataFromDB = (callback: Function, path: string) => {
    get(ref(db, path))
        .then((snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val());
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

export const deleteFromDB = (path: string) => {
    remove(ref(db, path));
};

export const updateDB = (path: string, data: DataForDB) => {
    update(ref(db, path), data);
};
