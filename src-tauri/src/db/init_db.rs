use anyhow::Result;

use super::utils::create_connection;

pub fn initialize() -> Result<()> {
    create_accounts_table()?;
    create_ticker_table()?;
    create_investments_table()?;
    Ok(())
}

fn create_accounts_table() -> Result<()> {
    let conn = create_connection();
    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS account (
            id integer primary key,
            account text not null
        )
    ",
        (),
    )?;

    Ok(())
}

fn create_investments_table() -> Result<()> {
    let conn = create_connection();
    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS investment (
            id INTEGER PRIMARY KEY,
            account_id INTEGER NOT NULL,
            ticker TEXT NOT NULL,
            shares REAL NOT NULL,
            value REAL NOT NULL,
            FOREIGN KEY (account_id) REFERENCES accounts(id),
            FOREIGN KEY (ticker) REFERENCES ticker(ticker)
        );
    ",
        (),
    )?;

    Ok(())
}

fn create_ticker_table() -> Result<()> {
    let conn = create_connection();
    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS ticker (
            ticker TEXT PRIMARY KEY
        );
    ",
        (),
    )?;

    Ok(())
}
