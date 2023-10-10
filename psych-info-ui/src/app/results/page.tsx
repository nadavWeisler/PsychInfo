"use client";
import { Provider } from "react-redux";
import store from "@/app/store/index";
import ResultsPrePage from "@/app/Components/ResultComp/ResultPrePage";

function ResultsPage() {
    return (
        <Provider store={store}>
            <ResultsPrePage />
        </Provider>
    );
}

export default ResultsPage;
