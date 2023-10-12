"use client";
import { Provider } from "react-redux";
import store from "@/app/store/index";
import ResultsPrePage from "@/app/Components/ResultComp/ResultPrePage";

export default function ResultsPage() {
    return (
        <Provider store={store}>
            <ResultsPrePage />
        </Provider>
    );
}