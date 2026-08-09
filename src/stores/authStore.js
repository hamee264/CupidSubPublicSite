import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    session: null,
    loading: true,
  }),

  actions: {
    async initialize() {
      this.loading = true;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      this.session = session;
      this.user = session?.user ?? null;

      supabase.auth.onAuthStateChange((event, session) => {
        this.session = session;
        this.user = session?.user ?? null;
      });

      this.loading = false;
    },

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

    async loginWithGoogle() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    },

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
