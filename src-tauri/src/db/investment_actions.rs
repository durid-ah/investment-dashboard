use crate::db::utils::create_connection;
use crate::db::utils::List;

#[derive(Clone, serde::Deserialize, serde::Serialize)]
pub struct Investment {
    id: i64,
    account_id: i64,
    ticker: String,
    shares: f64,
    value: f64,
}

#[tauri::command]
pub fn add_investment(investment: Investment) -> Result<usize, String> {
    let conn = create_connection();
    conn.execute(
        "INSERT INTO investments(account_id, ticker, shares, value) 
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
        "UPDATE investements
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
pub fn get_investments_by_account(account_name: String) -> Result<List<Investment>, String> {
    Ok(List(vec![]))
}
