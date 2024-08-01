// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::Result;

mod db;

fn main() -> Result<()> {
    db::init_db::initialize()?;

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            db::account_actions::add_account,
            db::account_actions::get_accounts,
            db::account_actions::delete_account,
            db::investment_actions::add_investment,
            db::investment_actions::update_investment,
            db::investment_actions::get_investments_by_account,
            db::ticker_actions::get_tickers,
            db::ticker_actions::add_ticker
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
