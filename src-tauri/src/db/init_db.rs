use anyhow::Result;

use super::utils::create_connection;

pub fn initialize() -> Result<()> {
    create_investment_table()?;

    Ok(())
}

fn create_investment_table() -> Result<()> {
    let conn = create_connection();
    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS investment (
            id INTEGER PRIMARY KEY,
            account_id INTEGER NOT NULL,
            ticker TEXT NOT NULL,
            shares REAL NOT NULL,
            value REAL NOT NULL,
            category TEXT NULL,
            FOREIGN KEY (account_id) REFERENCES account(id),
            FOREIGN KEY (ticker) REFERENCES ticker(ticker),
            FOREIGN KEY (category) REFERENCES investment_category(category)
        );
    ",
        (),
    )?;

    Ok(())
}
