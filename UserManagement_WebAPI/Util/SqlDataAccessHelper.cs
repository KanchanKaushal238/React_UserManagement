using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagement_WebAPI.Util
{
    public class SqlDataAccessHelper
    {
        /// <summary>
        /// Gets the SQL connection.
        /// </summary>
        /// <param name="connString">The connection string.</param>
        /// <returns></returns>
        public static async Task<SqlConnection> GetSqlConnection(string connString)
        {
            var connection = new SqlConnection(connString);
            await connection.OpenAsync();
            return connection;
        }

        /// <summary>
        /// Executes the non query.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        /// <param name="commandText">The command text.</param>
        /// <param name="commandType">Type of the command.</param>
        /// <param name="commandParameters">The command parameters.</param>
        /// <returns></returns>
        //public static async Task<int> ExecuteNonQuery(string connString, string commandText, CommandType commandType, params SqlParameter[] commandParameters)
        //{
        //    int result = 0;

        //    using (var connection = await GetSqlConnection(connString))
        //    {
        //        using (var command = new SqlCommand(commandText, connection))
        //        {
        //            command.CommandType = commandType;
        //            command.Parameters.AddRange(commandParameters);
        //            using (var reader = await command.ExecuteReaderAsync())
        //            {
        //                if (reader.HasRows)
        //                {
        //                    dt.Load(reader);
        //                }
        //            }
        //            return dt;
        //        }
        //    }

        //    return result;
        //}

        /// <summary>
        /// Method to execute query as data table
        /// </summary>
        /// <param name="commandText"></param>
        /// <param name="commandType"></param>
        /// <param name="commandParameters"></param>
        /// <returns></returns>
        public static async Task<DataTable> ExecuteQueryAsDataTable(string connString, string commandText, CommandType commandType, params SqlParameter[] commandParameters)
        {
            DataTable dt = new DataTable();
            using (var connection = await GetSqlConnection(connString))
            {
                using (var command = new SqlCommand(commandText, connection))
                {
                    command.CommandType = commandType;
                    command.Parameters.AddRange(commandParameters);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            dt.Load(reader);
                        }
                    }
                    return dt;
                }
            }
        }
    }
}
