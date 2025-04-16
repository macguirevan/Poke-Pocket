import json
import mysql.connector as mysqldb

# Database config
DB_CONFIG = {
    'host': '127.0.0.1',
    'port': 3307,
    'user': 'dfranco1',
    'password': 'dfrancoms1234',
    'database': 'poke_pocket'
}

# Load cards from JSON
def load_cards_from_json(json_path):
    with open(json_path, 'r') as f:
        return json.load(f)

# Insert cards into database
def insert_cards(cards):
    try:
        db = mysqldb.connect(**DB_CONFIG)
        cursor = db.cursor()

        sql = """
            INSERT INTO cards (name, card_image, rarity, set_name)
            VALUES (%s, %s, %s, %s)
        """

        for card in cards:
            values = (card['name'], card['card_image'], card['rarity'], card['set_name'])
            cursor.execute(sql, values)

        db.commit()
        print(f"[✓] {cursor.rowcount} total rows inserted.")

        cursor.close()
        db.close()

    except mysqldb.Error as err:
        print(f"[✗] MySQL Error: {err}")
    except Exception as e:
        print(f"[✗] Other Error: {e}")

if __name__ == '__main__':
    cards = load_cards_from_json('data/cards.json')
    unique_cards = { card['card_image']: card for card in cards }
    cards = list(unique_cards.values())
    insert_cards(cards)
