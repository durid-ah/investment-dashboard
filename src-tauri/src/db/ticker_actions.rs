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
        Ok(res) => {
            let res = res
                .into_iter()
                .map(|mut row| {
                    row.ticker_name = row.ticker_name.to_uppercase();
                    row
                })
                .collect();

            Ok(List(res))
        }
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn add_ticker(new_ticker: String) -> Result<usize, String> {
    use crate::schema::ticker;
    use diesel::RunQueryDsl;

    let new_ticker = new_ticker.to_lowercase();

    let conn = &mut establish_connection(); //create_connection();
    diesel::insert_into(ticker::table)
        .values(&Ticker {
            ticker_name: new_ticker,
        })
        .execute(conn)
        .map_err(|err| err.to_string())
}
