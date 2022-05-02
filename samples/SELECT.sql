SELECT
  `t0`.name AS t0_name,
  `t0`.status AS t0_status,
  `t0`.created AS t0_created,
  `t1`.id AS t1_id,
  `t1`.username AS t1_username,
  `t1`.password AS t1_password,
  `t1`.email AS t1_email,
  `t1`.state AS t1_state,
  `t1`.created AS t1_created,
  `t1`.updated AS t1_updated,
  `t1`.pin AS t1_pin,
  `t1`.isManual AS t1_isManual,
  `t2`.post_id AS t2_post_id,
  `t2`.term_id AS t2_term_id,
  `t3`.id AS t3_id,
  `t3`.name AS t3_name,
  `t3`.slug AS t3_slug,
  `t3`.taxonomy AS t3_taxonomy
FROM
  `posts` AS `t0`
INNER JOIN
    `users` AS `t1`
  ON
    `t1`.id = `t0`.user_id
LEFT JOIN
    `posts_terms` AS `t2`
  ON
    `t2`.post_id = `t0`.id
LEFT JOIN
    `terms` AS `t3`
  ON
    `t3`.id = `t2`.term_id
WHERE
  `t0`.id = 2;

SELECT
  `t0`.name AS t0_name,
  `t0`.status AS t0_status,
  `t0`.created AS t0_created,
  `t1`.id AS t1_id,
  `t1`.username AS t1_username,
  `t1`.password AS t1_password,
  `t1`.email AS t1_email,
  `t1`.state AS t1_state,
  `t1`.created AS t1_created,
  `t1`.updated AS t1_updated,
  `t1`.pin AS t1_pin,
  `t1`.isManual AS t1_isManual,
  `t2`.post_id AS t2_post_id,
  `t2`.term_id AS t2_term_id,
  `t3`.id AS t3_id,
  `t3`.name AS t3_name,
  `t3`.slug AS t3_slug,
  `t3`.taxonomy AS t3_taxonomy
FROM
  `posts` AS `t0`
INNER JOIN
  `users` AS `t1`
  ON
  `t1`.id = `t0`.user_id
LEFT JOIN
  `posts_terms` AS `t2`
  ON
  `t2`.post_id = `t0`.id
LEFT JOIN
  `terms` AS `t3`
  ON
  `t3`.id = `t2`.term_id
WHERE
  `t0`.id = 2;

-- SELECT
--   `t0`.name AS t0_name,
--   `t0`.status AS t0_status,
--   `t0`.created AS t0_created,
--   `t1`.id AS t1_id,
--   `t1`.username AS t1_username,
--   `t1`.password AS t1_password,
--   `t1`.email AS t1_email,
--   `t1`.state AS t1_state,
--   `t1`.created AS t1_created,
--   `t1`.updated AS t1_updated,
--   `t1`.pin AS t1_pin,
--   `t1`.isManual AS t1_isManual,
--   `t2`.post_id AS t2_post_id,
--   `t2`.term_id AS t2_term_id,
--   `t3`.id AS t3_id,
--   `t3`.name AS t3_name,
--   `t3`.slug AS t3_slug,
--   `t3`.taxonomy AS t3_taxonomy
-- FROM
--   `posts` AS `t0`,
--   `users` AS `t1`,
--   `posts_terms` AS `t2`,
--   `terms` AS `t3`
-- WHERE
--   `t0`.user_id = `t1`.id
-- AND
--   `t2`.post_id = `t0`.id
-- AND
--   `t2`.term_id = `t3`.id
-- AND
--   `t0`.id = ?