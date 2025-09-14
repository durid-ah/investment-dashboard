// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::Result;

mod db;
pub mod schema;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() -> Result<()> {
    dotenvy::dotenv().expect("unable to retrieve environment variables");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            db::account_actions::add_account,
            db::account_actions::update_account,
            db::account_actions::get_accounts,
            db::account_actions::delete_account,
            db::investment_actions::add_investment,
            db::investment_actions::update_investment,
            db::investment_actions::delete_investment,
            db::investment_actions::get_investments_by_account,
            db::ticker_actions::get_tickers,
            db::ticker_actions::add_ticker,
            db::investment_category_actions::get_categories,
            db::investment_category_actions::add_category
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
