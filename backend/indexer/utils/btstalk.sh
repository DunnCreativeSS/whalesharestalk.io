
# ---------------------------------------------------------------------------
# wlstalk + children
# ---------------------------------------------------------------------------

python3 reindex.py '{
  "_id": "wlstalk-announcements",
  "name": "Official Announcements",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 1,
  "description": "Announcements from the official wlstalk team",
  "tags": [],
  "accounts": ["wlstalk"]
}'

python3 reindex.py '{
  "_id": "wlstalk-general",
  "name": "General Discussion",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 2,
  "description": "General discussions about Bitshares",
  "tags": ["bts", "bitshares"]
}'

python3 reindex.py '{
  "_id": "wlstalk-projects",
  "name": "Specific Projects",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 3,
  "description": "Updates for projects and efforts",
  "tags": ["bts-project"]
}'

python3 reindex.py '{
  "_id": "wlstalk-dev",
  "name": "Developers",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 4,
  "description": "Developer chat, guides and project chatter.",
  "tags": ["bts-dev"]
}'

python3 reindex.py '{
  "_id": "wlstalk-bps",
  "name": "Block Producers",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 5,
  "description": "Bitshares Block Producers",
  "tags": ["bts-bps"]
}'

python3 reindex.py '{
  "_id": "wlstalk-meetups",
  "name": "Bitshares Meetups",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 6,
  "description": "Bitshares Meetups",
  "tags": ["bts-meetups"]
}'

python3 reindex.py '{
  "_id": "wlstalk-price",
  "name": "Bitshares price",
  "group": "wlstalk",
  "group_order": 1,
  "forum_order": 7,
  "description": "Bitshares price",
  "tags": ["bts-price"]
}'
