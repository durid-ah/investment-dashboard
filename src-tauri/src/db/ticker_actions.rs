use crate::db::models;

use super::{
    models::Ticker,
    utils::{establish_connection, List},
};

#[tauri::command]
pub fn get_tickers() -> Result<List<Ticker>, String> {
    use crate::schema::ticker::dsl::*;
    use diesel::{QueryDsl, RunQueryDsl, SelectableHelper};

    let conn = &mut establish_connection();
    let results = ticker.select(models::Ticker::as_select()).load(conn);

    match results {
        Ok(res) => Ok(List(res)),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn add_ticker(ticker_name: String) -> Result<usize, String> {
    use crate::schema::ticker;
    use diesel::RunQueryDsl;

    let conn = &mut establish_connection(); //create_connection();
    diesel::insert_into(ticker::table)
        .values(&Ticker { ticker_name })
        .execute(conn)
        .map_err(|err| err.to_string())
}
