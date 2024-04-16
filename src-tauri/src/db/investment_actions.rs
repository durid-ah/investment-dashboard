use crate::db::utils::create_connection;

#[derive(Clone, serde::Deserialize, serde::Serialize)]
pub struct Investment {
    id: i64,
    account_id: i64,
    ticker: String,
    shares: f64,
    value: f64
}

#[tauri::command]
pub fn add_investment(investment: Investment) -> Result<usize, String> {
    let conn = create_connection();
    conn.execute(
        "INSERT INTO investments(account_id, ticker, shares, value) 
            VALUES (?1, ?2, ?3, ?4)", 
            (investment.account_id, 
                investment.ticker, 
                investment.shares, 
                investment.value)
            ).map_err(|err| err.to_string())
}