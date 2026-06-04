import db from "#db/client";

/* create the folder name. We insert the folder into the folder table by putting the folder name into the name column. values $1 references the name input from the function - destructure the rows = wait for the query and get the new folder. 
*/

export async function createFolder ({ name }) {
    const sql = `
    INSERT INTO folders (name)
    VALUES ($1)
    RETURNING *
    `;
    const { rows: [folder] } = await db.query(sql, [name]);
    return folder;
}