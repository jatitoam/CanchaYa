import re
import unittest
from html.parser import HTMLParser
from pathlib import Path


class ContactFormParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.inputs = {}

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "input" and "name" in attributes:
            self.inputs[attributes["name"]] = attributes


class ContactFormTest(unittest.TestCase):
    def test_optional_field_and_hour_format_match_database_contract(self):
        parser = ContactFormParser()
        parser.feed(Path("contact.html").read_text())

        self.assertNotIn("required", parser.inputs["cancha"])
        self.assertIn("required", parser.inputs["hora_solicitada"])

        pattern = parser.inputs["hora_solicitada"]["pattern"]
        for valid_hour in ("9:00 PM", "09:00 PM", "12:59 AM"):
            self.assertRegex(valid_hour, rf"^(?:{pattern})$")
        for invalid_hour in ("21:00", "0:00 AM", "13:00 PM", "9:60 PM", "9:00 pm"):
            self.assertIsNone(re.fullmatch(pattern, invalid_hour))


if __name__ == "__main__":
    unittest.main()
