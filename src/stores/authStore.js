import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    session: null,
    loading: true,
    initialized: false,
  }),

  actions: {
    /* =====================================================
       INITIALIZE AUTH
    ===================================================== */

    async initialize() {
      if (this.initialized) {
        return;
      }

      this.loading = true;

      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        this.session = session;
        this.user = session?.user ?? null;

        /*
         * Listen for future authentication changes.
         */

        supabase.auth.onAuthStateChange((event, session) => {
          this.session = session;
          this.user = session?.user ?? null;
        });

        this.initialized = true;
      } catch (error) {
        console.error("Auth initialization failed:", error);

        this.session = null;
        this.user = null;
      } finally {
        this.loading = false;
      }
    },

    /* =====================================================
       EMAIL LOGIN
    ===================================================== */

    async login(email, password) {
      const normalizedEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
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
       EMAIL REGISTER
    ===================================================== */

    async register(email, password, metadata = {}) {
      const normalizedEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,

        password,

        options: {
          data: metadata,
        },
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
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      return data;
    },

    /* =====================================================
       GET CURRENT SESSION
    ===================================================== */

    async getSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      this.session = data.session;
      this.user = data.session?.user ?? null;

      return data.session;
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
