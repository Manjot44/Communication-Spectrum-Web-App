--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Images; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Images" (img_id, url) FROM stdin;
\.


--
-- Data for Name: Professionals; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Professionals" (email, full_name, password, location, dob, profession, postcode, is_subbed) FROM stdin;
111	111	$2b$10$z9CPBYmYqnsHeLgM09wrTuU.AJGKGJ16zMPoR3ffIi5Wtuwc4Dm1q	Australia	2024-01-01	Behaviour Support Practitioner	1111	f
\.


--
-- Data for Name: SupportUsers; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."SupportUsers" (user_id, name, dob, postcode, snapshot, comm_env, interests, profile_pic) FROM stdin;
1	11	2024-01-01	1111	Body Language	111	111	
\.


--
-- Data for Name: ProfUserImageAccess; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."ProfUserImageAccess" (img_id, prof_id, user_id) FROM stdin;
\.


--
-- Data for Name: Supports; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Supports" (support_id, title, title_img, date, step_img, step_names, step_times, category, layout, prof_id) FROM stdin;
\.


--
-- Data for Name: hasClient; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."hasClient" (prof_id, user_id) FROM stdin;
111	1
\.


--
-- Data for Name: hasSupport; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."hasSupport" (support_id, user_id) FROM stdin;
\.


--
-- Name: Images_img_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."Images_img_id_seq"', 1, false);


--
-- Name: SupportUsers_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."SupportUsers_user_id_seq"', 1, true);


--
-- Name: Supports_support_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."Supports_support_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

