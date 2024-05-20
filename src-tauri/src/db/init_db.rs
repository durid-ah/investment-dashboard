use anyhow::Result;

use super::utils::create_connection;

pub fn initialize() -> Result<()> {
    create_accounts_table()?;
    create_investments_table()?;

    Ok(())
}

fn create_accounts_table() -> Result<()> {
    let conn = create_connection(); 
    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS accounts (
            id integer primary key,
            account text not null
        )
    ", (),
    )?;

    Ok(())
}

fn create_investments_table() -> Result<()> {
    let conn = create_connection();
    conn.execute("
        CREATE TABLE IF NOT EXISTS investments (
            id INTEGER PRIMARY KEY,
            account_id INTEGER NOT NULL,
            ticker TEXT NOT NULL,
            shares REAL NOT NULL,
            value REAL NOT NULL,
            FOREIGN KEY (account_id) REFERENCES accounts(id)
        );
    ", ())?;

    Ok(())
}
