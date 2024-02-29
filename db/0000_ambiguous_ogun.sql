CREATE TABLE `person` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`email_verified` integer,
	`image` text,
	`google_sub` text,
	`google_picture` text
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`person_id` text NOT NULL,
	`expire_dts` integer NOT NULL,
	FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `text_cache` (
	`text_cache_id` text PRIMARY KEY NOT NULL,
	`create_dts` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`validate_dts` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`etag` text,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `person_email_unique` ON `person` (`email`);--> statement-breakpoint
CREATE INDEX `session_person_id_idx` ON `session` (`person_id`);