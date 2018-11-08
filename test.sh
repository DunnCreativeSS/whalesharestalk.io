
# ---------------------------------------------------------------------------
# wlstalk + children
# ---------------------------------------------------------------------------

python3 reindex.py '{
  "_id": "wlsannouncements",
  "name": "Official Announcements",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 1,
  "description": "Announcements from the official wlstalk team",
  "tags": ["wlsannouncements"],
  "accounts": ["swapbit"]
}'

python3 reindex.py '{
  "_id": "wlsgeneral",
  "name": "General Discussion",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 2,
  "description": "General discussions about Whaleshares",
  "tags": ["wlsgeneral"]
}'

python3 reindex.py '{
  "_id": "wlsprojects",
  "name": "Specific Projects",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 3,
  "description": "Updates for projects and efforts",
  "tags": ["wlsprojects"]
}'

python3 reindex.py '{
  "_id": "wlsevents",
  "name": "Events",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 4,
  "description": "Chats re: Whaleshares events.",
  "tags": ["wlsevents"]
}'

python3 reindex.py '{
  "_id": "wlswatercooler",
  "name": "Water Cooler",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 5,
  "description": "Chat about anything off-topic",
  "tags": ["wlswatercooler"]
}'

python3 reindex.py '{
  "_id": "wlsbazaar",
  "name": "Whaleshares Bazaar",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 6,
  "description": "Want to trade for Whaleshares? Do it here!",
  "tags": ["wlsbazaar"]
}'

python3 reindex.py '{
  "_id": "wlsprice",
  "name": "Whaleshares price",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 7,
  "description": "Whalehares price",
  "tags": ["wlsprice"]
}'

