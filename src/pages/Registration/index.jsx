import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {fetchRegister, selectIsAuth}  from "../../redux/slices/auth";

import styles from './Login.module.scss';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
      const { 
        register, 
        handleSubmit, 
        setError, 
        formState: { 
          errors, 
          isValid,
        },
     } = useForm({
        defaultValues: {
          fullname: '',
          email: '',
          password: ''
        },
        mode: 'onChange',
      });

      const onSubmit = async (values) => {
        try {
          const data = await dispatch(fetchRegister(values));
          if (!data.payload) {
            return alert('Не удалось зарегестрироваться!');
          }
      
          if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
          }
        } catch (error) {
          console.error(error);
          alert('Ошибка при регистрации');
        }
      };

      if (isAuth) {
        return <Navigate to="/" />
      }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
    <form onSubmit={handleSubmit(onSubmit)} >
    <TextField error={
        Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        { ...register('fullName', {required: 'Укажите полное имя'}) }
        fullWidth className={styles.field} 
        label="Укажите полное имя"
         />
      
      <TextField error={
        Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        { ...register('email', {required: 'Укажите почту'}) }
        fullWidth 
        className={styles.field} 
        label="E-Mail" 
         />
      
      <TextField error={
        Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type="password"
        { ...register('password', {required: 'Укажите пароль'}) }
        fullWidth 
        className={styles.field} 
        label="Пароль" 
         />
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </form>
    </Paper>
  );
};
