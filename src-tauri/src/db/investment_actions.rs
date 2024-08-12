use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};

use crate::db::models::{Investment, NewInvestment};
use crate::db::utils::establish_connection;
use crate::db::utils::List;

#[tauri::command]
pub fn add_investment(mut new_investment: NewInvestment) -> Result<usize, String> {
    use crate::schema::investment;

    new_investment.ticker = new_investment.ticker.to_lowercase();

    let conn = &mut establish_connection();

    diesel::insert_into(investment::table)
        .values(&new_investment)
        .execute(conn)
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub fn update_investment(investment_update: Investment) -> Result<usize, String> {
    use crate::schema::investment::dsl::*;
    let conn = &mut establish_connection(); //create_connection();

    diesel::update(investment.find(investment_update.id))
        .set((
            ticker.eq(investment_update.ticker),
            shares.eq(investment_update.shares),
            value.eq(investment_update.value),
            category.eq(investment_update.category),
        ))
        .execute(conn)
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub fn get_investments_by_account(filter_account_id: i32) -> Result<List<Investment>, String> {
    use crate::schema::investment::dsl::*;
    use diesel::ExpressionMethods;
    use diesel::QueryDsl;
    use diesel::RunQueryDsl;
    use diesel::SelectableHelper;

    let conn = &mut establish_connection();
    let results = investment
        .filter(account_id.eq(filter_account_id))
        .select(Investment::as_select())
        .load(conn);

    match results {
        Ok(rows) => {
            let rows = rows
                .into_iter()
                .map(|mut row| {
                    row.ticker = row.ticker.to_uppercase();
                    row
                })
                .collect();

            Ok(List(rows))
        }
        Err(error) => Err(error.to_string()),
    }
}
