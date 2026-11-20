# TuneVault — CS50 SQL Final Project

**Author:** Ana Carolina da Silva Barros  
**GitHub:** [@annasb-oss](https://github.com/annasb-oss)  
**edX username:** [ADD YOUR edX USERNAME]  
**Location:** Paraguaçu Paulista, São Paulo, Brazil  
**Date:** November 20, 2026

## Video overview

**Video URL:** [ADD THE PUBLIC OR UNLISTED YOUTUBE LINK AFTER RECORDING]

The required video must be no longer than three minutes and must begin by showing the project title, author name, GitHub and edX usernames, city and country, and recording date.

## Purpose

TuneVault is a relational database for organizing a personal music collection. It brings together information about artists, albums, tracks, genres, users, and playlists so that music lovers can catalog songs, build playlists, and retrieve music information through structured SQL queries.

The project demonstrates how a relational database can represent real-world music concepts while maintaining data integrity and reducing unnecessary duplication. Instead of storing every detail about a song in one large table, TuneVault separates related concepts into entities and connects them through keys.

## Scope

The database focuses on the data layer of a music-library application. Its scope includes storing music metadata, associating tracks with artists and albums, classifying tracks by genre, and organizing tracks into user playlists. It is a structured foundation for a music discovery or collection-management application; it does not stream audio, host music files, process subscriptions, or connect to commercial music services.

The implementation uses SQLite. This choice makes the project portable and easy to run locally while providing relational features such as constraints, joins, views, and indexes.

## Entities

- **Users:** people who maintain a personal music collection and create playlists.
- **Artists:** performers or groups associated with music recordings.
- **Albums:** releases associated with artists and containing tracks.
- **Tracks:** individual musical recordings, with metadata and relationships to albums, artists, and genres.
- **Genres:** categories used to classify tracks.
- **Playlists:** named collections created by users.
- **Playlist tracks:** the associative relationship that records which tracks belong to playlists and their ordering.

The playlist-track association is important because a playlist can contain many tracks and a track can appear in many playlists. Representing this many-to-many relationship with a junction table avoids repeating playlist or track information.

## Relationships

A user can create multiple playlists, while each playlist belongs to one user. An artist can be associated with multiple albums and tracks. An album can contain multiple tracks, and each track can be classified under a genre. Playlists and tracks have a many-to-many relationship represented through the playlist-track association.

Primary keys uniquely identify records. Foreign keys connect dependent records to parent entities and help prevent orphaned relationships. Unique constraints should be used for values or combinations that must not be duplicated, such as a playlist-track pair when the same track should appear only once in a playlist.

## Design decisions and normalization

The schema separates artists, albums, tracks, genres, users, and playlists because these concepts have independent attributes and lifecycles. An artist's name, for example, should not need to be repeated for every track, and a genre label should not be copied into every playlist entry. This reduces update anomalies and keeps the data easier to maintain.

The design follows relational normalization: each table represents one subject, attributes are stored with the entity they describe, and relationships are represented through foreign keys or junction tables. Many-to-many relationships are resolved using an associative table rather than storing lists of identifiers in a single column.

SQLite constraints such as NOT NULL, UNIQUE, PRIMARY KEY, and FOREIGN KEY are appropriate for enforcing required values and referential integrity. Foreign-key enforcement should be enabled for each database connection.

## Queries and expected use

Typical operations include adding artists, albums, tracks, genres, users, and playlists; retrieving a track with its artist, album, and genre; listing tracks in a playlist in their intended order; finding all albums by an artist; and updating or deleting records when a user's collection changes.

Joins are central because useful music information is distributed across related tables. Aggregate queries can summarize the number of tracks per artist, album, or genre. Views can simplify frequently used multi-table lookups, while indexes on foreign-key columns and commonly searched fields can improve query performance as the collection grows.

The accompanying schema.sql file defines the database structure and integrity rules. The queries.sql file documents representative read and write operations.

## Optimizations

Indexes are useful on columns frequently used in joins, filters, and sorting, especially foreign keys and fields such as artist names, album titles, and track titles. Indexes should be added based on expected query patterns rather than indiscriminately, because each index consumes storage and adds work to insert, update, and delete operations.

Views can provide reusable representations of common queries, such as a track listing enriched with artist, album, and genre information. They keep query logic consistent without duplicating the underlying data.

## Limitations

TuneVault is a learning project and a database foundation, not a complete streaming platform. It does not include audio storage or playback, recommendation algorithms, external catalog synchronization, authentication security, collaborative playlist editing, or a production API. Music metadata is only as complete and accurate as the records entered by users.

SQLite is suitable for a portable local project, but a large multi-user service with concurrent writes and remote access may eventually require a client-server database such as PostgreSQL. The current design prioritizes clarity, relational integrity, and demonstration of SQL concepts over production-scale infrastructure.

## Entity-relationship diagram

The project includes an ER diagram at docs/er-diagram.svg. It should be kept synchronized with the final table definitions in schema.sql.
