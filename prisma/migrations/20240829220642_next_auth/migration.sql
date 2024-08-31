-- CreateTable
CREATE TABLE "credit_application" (
    "section" TEXT,
    "breadcrumbs" JSON,
    "formSelection" TEXT,
    "housingOrRenting" TEXT,
    "name-1" TEXT,
    "Street-1" TEXT,
    "city-1" TEXT,
    "state-1" TEXT,
    "zip-1" TEXT,
    "phone-1" TEXT,
    "lastName" TEXT,
    "firstName" TEXT,
    "phoneNumber" TEXT,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "middleInitial" TEXT,
    "lengthOfStayAtAddress" TEXT,
    "SSN" TEXT,
    "driversLicenseNumber" TEXT,
    "licenseExpiration" TEXT,
    "dateOfBirth" TEXT,
    "company" TEXT,
    "employmentLength" TEXT,
    "companyAddress" TEXT,
    "companyTel" TEXT,
    "supervisor" TEXT,
    "department" TEXT,
    "jobDescription" TEXT,
    "income" TEXT,
    "mortgage" TEXT,
    "phone" TEXT,
    "ownPayment" TEXT,
    "name-2" TEXT,
    "Street-2" TEXT,
    "Number-2" TEXT,
    "floor-2" TEXT,
    "city-2" TEXT,
    "state-2" TEXT,
    "zip-2" TEXT,
    "phone-2" TEXT,
    "phone2-2" TEXT,
    "name-3" TEXT,
    "Street-3" TEXT,
    "Number-3" TEXT,
    "floor-3" TEXT,
    "city-3" TEXT,
    "state-3" TEXT,
    "zip-3" TEXT,
    "phone-3" TEXT,
    "phone2-3" TEXT,
    "name-4" TEXT,
    "Street-4" TEXT,
    "Number-4" TEXT,
    "floor-4" TEXT,
    "city-4" TEXT,
    "state-4" TEXT,
    "zip-4" TEXT,
    "phone-4" TEXT,
    "phone2-4" TEXT,
    "name-5" TEXT,
    "Street-5" TEXT,
    "Number-5" TEXT,
    "floor-5" TEXT,
    "city-5" TEXT,
    "state-5" TEXT,
    "zip-5" TEXT,
    "phone-5" TEXT,
    "phone2-5" TEXT,
    "name-6" TEXT,
    "Street-6" TEXT,
    "Number-6" TEXT,
    "floor-6" TEXT,
    "city-6" TEXT,
    "state-6" TEXT,
    "zip-6" TEXT,
    "phone-6" TEXT,
    "phone2-6" TEXT,
    "Number-1" TEXT,
    "floor-1" TEXT,
    "phone2-1" TEXT,
    "user" INTEGER NOT NULL DEFAULT 3,
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credit_application_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'r2',
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "image_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "business" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "transmission" TEXT,
    "drivetrain" TEXT,
    "mileage" TEXT,
    "make" TEXT,
    "model" TEXT,
    "body" TEXT,
    "year" TEXT,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "vin" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "fuel" TEXT,
    "color" TEXT,

    CONSTRAINT "inventory_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_image" (
    "id" SERIAL NOT NULL,
    "inventory" INTEGER NOT NULL,
    "image" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "inventory_image_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_image" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "image" INTEGER NOT NULL,
    "credit_app" INTEGER,
    "uploaded" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_image_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_url_uindex" ON "image"("url");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_image_inventory_image_uindex" ON "inventory_image"("inventory", "image");

-- CreateIndex
CREATE UNIQUE INDEX "user_image_image_credit_app_uindex" ON "user_image"("image", "credit_app");

-- CreateIndex
CREATE UNIQUE INDEX "user_image_user_image_uindex" ON "user_image"("user", "image");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_uindex" ON "users"("name");

-- AddForeignKey
ALTER TABLE "credit_application" ADD CONSTRAINT "credit_application_users_id_fk" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_image" ADD CONSTRAINT "inventory_image_image_id_fk" FOREIGN KEY ("image") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_image" ADD CONSTRAINT "inventory_image_inventory_id_fk" FOREIGN KEY ("inventory") REFERENCES "inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_image" ADD CONSTRAINT "user_image___fk" FOREIGN KEY ("credit_app") REFERENCES "credit_application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_image" ADD CONSTRAINT "user_image_image_id_fk" FOREIGN KEY ("image") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_image" ADD CONSTRAINT "user_image_users_id_fk" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
