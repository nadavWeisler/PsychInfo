'use client';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import IncomingRequests from '@/app/[lng]/Components/AdminComp/IncomingRequests';
import IncomingMistakes from '@/app/[lng]/Components/AdminComp/IncomingMistakes';
import { auth } from '@/app/[lng]/firebase/app';
import { AuthContext } from '@/app/[lng]/context/AuthContext';
import { Button, Box, Typography } from '@mui/material';
import useTrans from '@/app/[lng]/hooks/useTrans';
import ControlPanel from '@/app/[lng]/Components/AdminComp/ControlPanel';
import { getAllTags, getAllOrganizations } from '@/app/[lng]/firebase/commands';
import { Tag, Organization } from '@/app/[lng]/general/interfaces';
import { useAppDispatch, useAppSelector } from '@/app/[lng]/hooks/redux';
import { tagsAndOrgActions } from '@/store/tagsAndOrgSlice';
import { isStateActions } from '@/store/isStateSlice';
import { RootState } from '@/store';
import { LocalizationKeys } from '@/i18n/LocalizationKeys';

export default function AdminPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const { isDelete } = useAppSelector((state: RootState) => state.isState);

  const { t, i18n } = useTrans();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/');
      }
    });
  }, [user]);

  useEffect(() => {
    getAllTags(false, i18n.language)
      .then((tags) => {
        setTags(tags);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllOrganizations(false, i18n.language)
      .then((organizations) => {
        setOrganizations(organizations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isDelete]);

  useEffect(() => {
    dispatch(tagsAndOrgActions.getData({ tags, organizations }));
  }, [tags, organizations]);

  function logoutHandler(): void {
    signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return user ? (
    <Box sx={{ marginTop: 4 }}>
      <Typography color={'black'} variant={'h4'} sx={{ textAlign: 'center' }}>
        {t(LocalizationKeys.Admin.Title)}
      </Typography>
      <ControlPanel
        isDeleteHandler={() => dispatch(isStateActions.setIsDelete())}
        isDelete={isDelete}
      />
      <IncomingRequests />
      <IncomingMistakes />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Button
          onClick={logoutHandler}
          sx={{ margin: 'auto' }}
          variant={'contained'}
        >
          {t(LocalizationKeys.Common.Logout)}
        </Button>
      </Box>
    </Box>
  ) : null;
}
