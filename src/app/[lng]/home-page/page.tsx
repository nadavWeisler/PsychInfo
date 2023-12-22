"use client";
import WelcomeMsg from "@/app/[lng]/Components/UI/WelcomeMsg";
import { Provider } from "react-redux";
import store from "@/store";

export default function HomePage() {
  return (
    <Provider store={store}>
      <WelcomeMsg />
    </Provider>
  );
}
