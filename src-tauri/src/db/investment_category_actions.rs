use diesel::{query_dsl::methods::SelectDsl, RunQueryDsl, SelectableHelper};

use crate::db::{models, utils::establish_connection};

use super::{models::InvestmentCategory, utils::List};

#[tauri::command]
pub fn get_categories() -> Result<List<InvestmentCategory>, String> {
    use crate::schema::investment_category::dsl::*;

    let conn = &mut establish_connection();
    let results = investment_category
        .select(models::InvestmentCategory::as_select())
        .load(conn);

    match results {
        Ok(res) => {
            let res = res.into_iter().collect();
            Ok(List(res))
        }
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn add_category(new_category: String) -> Result<usize, String> {
    use crate::schema::investment_category;
    use diesel::RunQueryDsl;

    let conn = &mut establish_connection();
    diesel::insert_into(investment_category::table)
        .values(&models::InvestmentCategory { category: new_category })
        .execute(conn)
        .map_err(|err| err.to_string())
}
