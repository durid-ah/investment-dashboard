use super::utils::{create_connection, List};

#[derive(Clone, serde::Deserialize, serde::Serialize)]
pub struct Ticker {
    ticker: String,
}

#[tauri::command]
pub fn get_tickers() -> Result<List<Ticker>, String> {
    let conn = create_connection();
    let mut stmt = conn
        .prepare("SELECT ticker FROM ticker")
        .map_err(|err| err.to_string())?;

    let rows = stmt
        .query_map((), |row| {
            Ok(Ticker {
                ticker: row.get(0)?,
            })
        })
        .unwrap()
        .map(|row| row.unwrap())
        .collect();

    return Ok(List(rows));
}

#[tauri::command]
pub fn add_ticker(ticker: String) -> Result<usize, String> {
    let conn = create_connection();
    conn.execute("INSERT INTO ticker(ticker) VALUES (?1)", (ticker,))
        .map_err(|err| err.to_string())
}
