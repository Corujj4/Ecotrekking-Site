import { supabase } from "./supabaseClient.js";

/* =========================================================
   LOGIN
========================================================= */

export async function fazerLogin(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }

  return data;
}


/* =========================================================
   LOGOUT
========================================================= */

export async function fazerLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Erro ao sair:", error);
    throw error;
  }
}


/* =========================================================
   USUÁRIO ATUAL
========================================================= */

export async function obterUsuarioAtual() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(
      "Erro ao verificar usuário:",
      error
    );

    return null;
  }

  return user;
}


/* =========================================================
   VERIFICAR AUTENTICAÇÃO
========================================================= */

export async function usuarioAutenticado() {
  const usuario = await obterUsuarioAtual();

  return !!usuario;
}