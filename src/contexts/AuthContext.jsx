import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (!error && data) {
                setProfile(data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const loginProvider = async (provider) => {
        return supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: window.location.origin + '/dashboard' }
        });
    };

    const loginEmail = async (email, password) => {
        return supabase.auth.signInWithPassword({ email, password });
    };

    const registerEmail = async (email, password, fullName) => {
        return supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } }
        });
    };

    const resetPassword = async (email) => {
        return supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/update-password`,
        });
    };

    const updatePassword = async (newPassword) => {
        return supabase.auth.updateUser({ password: newPassword });
    };

    const logout = () => {
        return supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            loading,
            loginProvider,
            loginEmail,
            registerEmail,
            resetPassword,
            updatePassword,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
