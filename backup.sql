--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: blog; Type: TABLE; Schema: public; Owner: jaredthomas
--

CREATE TABLE blog (
    id integer NOT NULL,
    name character varying(255) DEFAULT 'Guest'::character varying,
    message character varying(2000) NOT NULL
);


ALTER TABLE blog OWNER TO jaredthomas;

--
-- Name: guestbook_id_seq; Type: SEQUENCE; Schema: public; Owner: jaredthomas
--

CREATE SEQUENCE guestbook_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE guestbook_id_seq OWNER TO jaredthomas;

--
-- Name: guestbook_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jaredthomas
--

ALTER SEQUENCE guestbook_id_seq OWNED BY blog.id;


--
-- Name: blog id; Type: DEFAULT; Schema: public; Owner: jaredthomas
--

ALTER TABLE ONLY blog ALTER COLUMN id SET DEFAULT nextval('guestbook_id_seq'::regclass);


--
-- Data for Name: blog; Type: TABLE DATA; Schema: public; Owner: jaredthomas
--

COPY blog (id, name, message) FROM stdin;
1	Jared	this is cool
\.


--
-- Name: guestbook_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jaredthomas
--

SELECT pg_catalog.setval('guestbook_id_seq', 5, true);


--
-- Name: blog guestbook_pkey; Type: CONSTRAINT; Schema: public; Owner: jaredthomas
--

ALTER TABLE ONLY blog
    ADD CONSTRAINT guestbook_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

