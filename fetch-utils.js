const SUPABASE_URL = 'https://wklzwpjnucxqivwzzalf.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrbHp3cGpudWN4cWl2d3p6YWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU1MjU2NDYsImV4cCI6MTk4MTEwMTY0Nn0.PtDEsNOJ50Njt_xqXlbp03Hm7a8qq8KILFty-r-Tnjo';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createPost(post) {
    return await client.from('posts').insert(post).single();
}

export async function getPosts() {
    return await client.from('posts').select('*');
}

export async function getPost(id) {
    return await client
        .from('posts')
        .select(`*, comments(*)`)
        .eq('id', id)
        .order('created_at', { foreignTable: 'comments', ascending: false })
        .single();
}

export async function createComment(comment) {
    return await client.from('comments').insert(comment).single();
}

export async function getComment(id) {
    return await client.from('comments').select(`*`).eq('id', id).single();
}

export function onMessage(postId, handleComment) {
    client.from(`comments:post_id=eq.${postId}`).on('INSERT', handleComment).subscribe();
}
