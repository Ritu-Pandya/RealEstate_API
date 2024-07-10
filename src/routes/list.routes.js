import express from 'express'
import { createList, deleteList, getAllListings, getListById, updateList } from '../controllers/listController.js';
import { verifyToken } from '../middleware/user.middleware.js';

const listingRouter = express.Router();
/**
 * @swagger
 * /api/listing/createlist:
 *   post:
 *     summary: Create a new listing
 *     tags: [Listing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Listing'
 *     responses:
 *       201:
 *         description: Listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       500:
 *         description: Internal server error
 */
listingRouter.post("/createlist",[verifyToken], createList);
/**
 * @swagger
 * /api/listing/getallList:
 *   get:
 *     summary: Get all listings
 *     tags: [Listing]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 9
 *         description: The number of listings to return
 *       - in: query
 *         name: startIndex
 *         schema:
 *           type: integer
 *           default: 0
 *         description: The starting index for listings
 *       - in: query
 *         name: offer
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Filter listings based on offer status
 *       - in: query
 *         name: furnished
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Filter listings based on furnished status
 *       - in: query
 *         name: parking
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Filter listings based on parking availability
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           default: all
 *         description: Filter listings based on type (sale, rent)
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *           default: ''
 *         description: Search term to filter listings by name
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: 'createdAt'
 *         description: Field to sort listings by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: 'desc'
 *         description: Order to sort listings (asc, desc)
 *     responses:
 *       200:
 *         description: A list of listings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Listing'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
listingRouter.get("/getallList",getAllListings);
/**
 * @swagger
 * /api/listing/getListById/{id}:
 *   get:
 *     summary: Get a listing by ID
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: Listing data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Internal server error
 */
listingRouter.get("/getListById/:id",[verifyToken],getListById);
/**
 * @swagger
 * /api/listing/updateById/{id}:
 *   patch:
 *     summary: Update a listing by ID
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Listing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Listing'
 *     responses:
 *       200:
 *         description: Listing updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Internal server error
 */
listingRouter.patch("/updateById/:id",[verifyToken],updateList);
/**
 * @swagger
 * /api/listing/deleteList/{id}:
 *   delete:
 *     summary: Delete a listing by ID
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: Listing deleted successfully
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Internal server error
 */
listingRouter.delete("/deleteList/:id",[verifyToken],deleteList);

export default listingRouter;