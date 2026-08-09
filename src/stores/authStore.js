import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    session: null,
    loading: true,
  }),

  actions: {
    /* =====================================================
           INITIALIZE AUTH
        ===================================================== */

    async initialize() {
      this.loading = true;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      this.session = session;
      this.user = session?.user ?? null;

      /* =================================================
               LISTEN FOR AUTH CHANGES
            ================================================= */

      supabase.auth.onAuthStateChange((event, session) => {
        this.session = session;
        this.user = session?.user ?? null;
      });

      this.loading = false;
    },

    /* =====================================================
           EMAIL LOGIN
        ===================================================== */

    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      this.session = data.session;
      this.user = data.user;

      return data;
    },

    /* =====================================================
           REGISTER
        ===================================================== */

    async register(email, password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      this.session = data.session;
      this.user = data.user;

      return data;
    },

    /* =====================================================
           GOOGLE LOGIN
        ===================================================== */

    async loginWithGoogle() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        throw error;
      }
    },

    /* =====================================================
           LOGOUT
        ===================================================== */

    async logout() {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      this.user = null;
      this.session = null;
    },
  },
});
