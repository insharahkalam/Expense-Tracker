import { createClient } from "@supabase/supabase-js";

const projectUrl = 'https://jjdtwcfwmcpgorstkach.supabase.co'
const projectKey = 'sb_publishable_5OSXo5T_0ZIHR-wCr6qp4A_hu7PDj7k'

export const client = createClient(projectUrl, projectKey)
console.log(client);
console.log(createClient);

