"use client";
import { useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "@firebase/auth";
import Wizrad from "@/app/[lng]/Components/Wizard/Wizard";
import WelcomeMsg from "@/app/[lng]/Components/UI/WelcomeMsg";
import { Filter } from "@/app/[lng]/general/interfaces";
import Gallary from "@/app/[lng]/Components/gallary/gallary";
import { GetFilters } from "@/app/[lng]/general/utils";
import ShareDialog from "@/app/[lng]/Components/ResultComp/ShareDialog";
import { Provider } from "react-redux";
import store from "@/store";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fabStyle, fabShareStyle } from "./homePage.style";
import useTrans from "../hooks/useTrans";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/app";
import ShareIcon from '@mui/icons-material/Share';

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const filters: Filter[] = GetFilters();
  const { user } = useContext(AuthContext);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [openShare, setOpenShare] = useState<boolean>(false);

  const { i18n } = useTrans();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
  }, [user]);

  const router = useRouter();
  return (
    <>
      <Provider store={store}>
        <WelcomeMsg openWizradHandler={() => setOpen(true)} />
        <Wizrad open={open} onClose={() => setOpen(false)} />
        <Gallary filters={filters} />
        <Fab
            color="primary"
            sx={fabShareStyle}
            onClick={() => setOpenShare(true)}
            aria-label="share"
          >
            <ShareIcon />
          </Fab>
        {authUser && (
          <Fab
            color="primary"
            sx={fabStyle}
            onClick={() => router.push(`/${i18n.language}/upload`)}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        )}
        <ShareDialog 
            open={openShare}
            onClose={() => setOpenShare(false)}
            urlToShare={"https://www.psychinfo.co.il"}
          />
      </Provider>
    </>
  );
}
