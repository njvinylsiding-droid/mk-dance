import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://iqbjyorzjamrpqbfphnt.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImEyYjViMzljLWY5OWEtNDVkMi1hZjU1LWYwYzViMjVlODkzNCJ9.eyJwcm9qZWN0SWQiOiJpcWJqeW9yemphbXJwcWJmcGhudCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc1OTk5MzY5LCJleHAiOjIwOTEzNTkzNjksImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.mJJzCyKrNXtCuK8-6E1fw6Vdqa1qgbl5eCptP6xUo4Q';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };