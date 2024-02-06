import sys


def generate_city_insert_statements():
    sql_data = read_file_data(filepath="data/city_data.sql")
    sql_query = (
        "INSERT INTO city (id, name, countrycode, district, population) VALUES\n"
    )

    for line in sql_data[1:]:
        if line.strip() == "\\.":
            break

        id_, name, countrycode, district, population = line.strip().split("\t")
        sql_query += f" ({id_}, '{name}', '{countrycode}', '{district}', {population.rstrip()}),\n"

    sql_query = sql_query[:-2] + ";"
    write_data(sql_query)


def generate_country_insert_statements():
    sql_data = read_file_data(filepath="data/country_data.sql")
    sql_query = "INSERT INTO country (code, name, continent, region, surfacearea, indepyear, population, lifeexpectancy, gnp, gnpold, localname, governmentform, headofstate, capital, code2) VALUES\n"

    for line in sql_data[1:]:
        if line.strip() == "\\.":
            break
        
        values = line.strip().split("\t")
        for i in range(len(values)):
            if values[i] == '\\N':
                values[i] = "NULL"
        (
            code,
            name,
            continent,
            region,
            surfacearea,
            indepyear,
            population,
            lifeexpectancy,
            gnp,
            gnpold,
            localname,
            governmentform,
            headofstate,
            capital,
            code2,
        ) = values

        sql_query += f" ('{code}', '{name}', '{continent}', '{region}', {surfacearea}, {indepyear}, {population}, {lifeexpectancy}, {gnp}, {gnpold}, '{localname}', '{governmentform}', '{headofstate}', {capital}, '{code2.rstrip()}'),\n"

    sql_query = sql_query[:-2] + ";"
    write_data(sql_query)


def read_file_data(filepath):
    try:
        with open(filepath, "r") as file:
            sql_data = file.readlines()
            return sql_data
    except FileNotFoundError:
        print(f"Error: File '{filepath}' not found.")
        sys.exit(1)


def write_data(sql_query):
    output_filename = "data/world.sql"
    try:
        with open(output_filename, "a") as output_file:
            output_file.write("\n\n" + sql_query + "\n")
            print("SQL Insert statements generated")
    except FileNotFoundError:
        print(f"Error: File '{output_filename}' not found.")
        sys.exit(1)


if __name__ == "__main__":
    # generate_city_insert_statements()
    generate_country_insert_statements()
