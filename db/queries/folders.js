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



/** @returns all folders */
export async function getFolders() {
  const sql = `
  SELECT *
  FROM folders
  `;
  const { rows: folders } = await db.query(sql);
  return folders;
}

/** @returns the folders specified by id */
export async function getFoldersById(id) {
  const sql = `
    SELECT folders.*, json_agg(files) AS files
    FROM folders
    JOIN files ON folders.id = files.folder_id
    WHERE folders.id = $1
    GROUP BY folders.id
  `;
  const {
    rows: [folders],
  } = await db.query(sql, [id]);
  return folders;
}

