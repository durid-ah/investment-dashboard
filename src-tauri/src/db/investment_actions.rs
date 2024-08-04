use crate::db::utils::create_connection;
use crate::db::utils::List;

#[derive(Clone, serde::Deserialize, serde::Serialize)]
pub struct Investment {
    id: u64,
    account_id: u64,
    ticker: String,
    shares: f64,
    value: f64,
    category: String
}

#[tauri::command]
pub fn add_investment(investment: Investment) -> Result<usize, String> {
    let conn = create_connection();
    conn.execute(
        "INSERT INTO investment(account_id, ticker, shares, value) 
            VALUES (?1, ?2, ?3, ?4)",
        (
            investment.account_id,
            investment.ticker,
            investment.shares,
            investment.value,
        ),
    )
    .map_err(|err| err.to_string())
}

#[tauri::command]
pub fn update_investment(investment: Investment) -> Result<usize, String> {
    let conn = create_connection();
    conn.execute(
        "UPDATE investement
            SET ticker = ?1 , shares = ?2 , value = ?3
          WHERE id = ?4",
        (
            investment.ticker,
            investment.shares,
            investment.value,
            investment.id,
        ),
    )
    .map_err(|err| err.to_string())
}

#[tauri::command]
pub fn get_investments_by_account(account_id: i64) -> Result<List<Investment>, String> {
    let conn = create_connection();
    let mut stmt = conn
        .prepare(
            "SELECT id, account_id, ticker, shares, value, category FROM investment
         WHERE account_id = ?1",
        )
        .map_err(|err| err.to_string())?;

    let rows = stmt
        .query_map((account_id,), |row| {
            Ok(Investment {
                id: row.get(0)?,
                account_id: row.get(1)?,
                ticker: row.get(2)?,
                shares: row.get(3)?,
                value: row.get(4)?,
                category: row.get(5)?
            })
        })
        .unwrap()
        .map(|row| row.unwrap())
        .collect();

    Ok(List(rows))
}
