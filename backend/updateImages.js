const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Fix specific mismatched images in Home & Kitchen and other categories
const fixMismatchedImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site');
        console.log('Connected to MongoDB');

        // More specific and accurate image URLs for problematic products
        const imageUpdates = [
            // Home & Kitchen - Generated Professional Images
            { name: 'Bone China Dinner Set', image: '/product-images/bone_china_dinner_set_1768592125185.png' },
            { name: 'Modern Table Lamp', image: '/product-images/modern_table_lamp_1768592140168.png' },
            { name: 'Artisan Coffee Maker', image: '/product-images/artisan_coffee_maker_1768592156260.png' },
            { name: 'Decorative Wall Clock', image: '/product-images/decorative_wall_clock_1768592169205.png' },
            { name: 'Japanese Chef Knife Set', image: '/product-images/japanese_chef_knife_set_1768592184085.png' },
            { name: 'Modern Ceramic Vase', image: '/product-images/modern_ceramic_vase_1768592202714.png' },
            { name: 'Smart Air Purifier', image: '/product-images/smart_air_purifier_1768592217676.png' },
            { name: 'Luxury Cotton Bed Sheets', image: '/product-images/luxury_cotton_bed_sheets_1768592233508.png' },
            { name: 'Cast Iron Skillet', image: '/product-images/cast_iron_skillet_1768592247781.png' },
            { name: 'Robot Vacuum Cleaner', image: '/product-images/robot_vacuum_cleaner_1768592261769.png' },
            { name: 'Electric Kettle Premium', image: '/product-images/electric_kettle_premium_1768592276705.png' },
            { name: 'High-Speed Blender', image: '/product-images/high_speed_blender_1768592291089.png' },
            { name: 'Stainless Steel Toaster', image: '/product-images/stainless_steel_toaster_1768592303925.png' },
            { name: 'Non-Stick Cookware Set', image: '/product-images/non_stick_cookware_set_1768592317140.png' },

            // Remaining items (Generated successfully after retry)
            { name: 'Instant Pressure Cooker', image: '/product-images/instant_pressure_cooker_new_1768592664696.png' },
            { name: 'Digital Rice Cooker', image: '/product-images/digital_rice_cooker_new_1768592688515.png' },
            { name: 'Stand Mixer Professional', image: '/product-images/stand_mixer_professional_new_1768592706556.png' },
            { name: 'RO Water Purifier', image: '/product-images/ro_water_purifier_new_1768592725309.png' },
            { name: 'Induction Cooktop', image: '/product-images/induction_cooktop_new_1768592740971.png' },
            { name: 'Food Storage Container Set', image: '/product-images/food_storage_container_set_new_1768592757622.png' },
            // Beauty & Wellness - Generated Images
            { name: 'Nourishing Body Lotion', image: '/product-images/nourishing_body_lotion_1768593003364.png' },
            { name: 'Hair Repair Serum', image: '/product-images/hair_repair_serum_1768593028478.png' },
            { name: 'Beard Grooming Kit', image: '/product-images/beard_grooming_kit_1768593046098.png' },
            { name: 'Professional Makeup Brush Set', image: '/product-images/professional_makeup_brush_set_1768593061162.png' },
            { name: 'Anti-Aging Eye Cream', image: '/product-images/anti_aging_eye_cream_1768593077334.png' },
            { name: 'Exfoliating Face Scrub', image: '/product-images/exfoliating_face_scrub_1768593095681.png' },

            // Beauty & Wellness - Generated Images (Batch 2)
            { name: 'Hydrating Facial Toner', image: '/product-images/hydrating_facial_toner_1768593267302.png' },
            { name: 'Daily Moisturizer SPF 30', image: '/product-images/daily_moisturizer_spf_30_1768593294500.png' },
            { name: 'Intensive Hand Cream', image: '/product-images/intensive_hand_cream_1768593309910.png' },
            { name: 'Radiance Skincare Set', image: '/product-images/radiance_skincare_set_1768593326677.png' },
            { name: 'Aromatherapy Diffuser', image: '/product-images/aromatherapy_diffuser_1768593343373.png' },
            { name: 'Professional Hair Dryer', image: '/product-images/professional_hair_dryer_1768593359090.png' },

            // Beauty & Wellness - Generated Images (Batch 3)
            { name: 'Luxury Perfume Collection', image: '/product-images/luxury_perfume_collection_1768593541559.png' },
            { name: 'Gentle Foam Face Wash', image: '/product-images/gentle_foam_face_wash_1768593571228.png' },
            { name: 'Moisturizing Lip Balm Set', image: '/product-images/moisturizing_lip_balm_set_1768593591151.png' },
            { name: 'Volumizing Mascara', image: '/product-images/volumizing_mascara_1768593606470.png' },
            { name: 'Liquid Foundation', image: '/product-images/liquid_foundation_1768593620362.png' },
            { name: 'Nail Polish Set 12 Colors', image: '/product-images/nail_polish_set_12_colors_1768593636673.png' },
            { name: 'Sheet Mask Variety Pack', image: '/product-images/sheet_mask_variety_pack_1768593889602.png' },

            // Sports & Fitness - Generated Images
            { name: 'Eco-Friendly Yoga Mat', image: '/product-images/eco_friendly_yoga_mat_1768594013191.png' },
            { name: 'Adjustable Dumbbell Pair', image: '/product-images/adjustable_dumbbell_pair_1768594030548.png' },
            { name: 'Organic Protein Powder', image: '/product-images/organic_protein_powder_1768594045384.png' },
            { name: 'Smart Fitness Tracker', image: '/product-images/smart_fitness_tracker_1768594060682.png' },
            { name: 'Resistance Bands Set', image: '/product-images/resistance_bands_set_1768594076317.png' },

            { name: 'Resistance Bands Set', image: '/product-images/resistance_bands_set_1768594076317.png' },

            // Sports & Fitness - Generated Images (Batch 2)
            { name: 'Speed Jump Rope', image: '/product-images/speed_jump_rope_1768594215984.png' },
            { name: 'High-Density Foam Roller', image: '/product-images/high_density_foam_roller_1768594243115.png' },
            { name: 'Cast Iron Kettlebell 16kg', image: '/product-images/cast_iron_kettlebell_16kg_1768594259874.png' },
            { name: 'Anti-Burst Exercise Ball', image: '/product-images/anti_burst_exercise_ball_1768594275024.png' },
            { name: 'Doorframe Pull-Up Bar', image: '/product-images/doorframe_pull_up_bar_1768594291571.png' },
            { name: 'Adjustable Weight Bench', image: '/product-images/adjustable_weight_bench_1768594306442.png' },

            { name: 'Adjustable Weight Bench', image: '/product-images/adjustable_weight_bench_1768594306442.png' },

            // Sports & Fitness - Generated Images (Batch 3)
            { name: 'Padded Cycling Shorts', image: '/product-images/padded_cycling_shorts_1768594512404.png' },
            { name: 'Anti-Fog Swimming Goggles', image: '/product-images/anti_fog_swimming_goggles_1768594532702.png' },
            { name: 'Professional Tennis Racket', image: '/product-images/professional_tennis_racket_1768594546852.png' },
            { name: 'Badminton Set Complete', image: '/product-images/badminton_set_complete_1768594564292.png' },
            { name: 'Official Size Football', image: '/product-images/official_size_football_1768594579531.png' },
            { name: 'Indoor/Outdoor Basketball', image: '/product-images/indoor_outdoor_basketball_1768594592608.png' },

            { name: 'Indoor/Outdoor Basketball', image: '/product-images/indoor_outdoor_basketball_1768594592608.png' },

            // Sports & Fitness - Generated Images (Batch 4 - Final)
            { name: 'Slim Running Belt', image: '/product-images/slim_running_belt_1768594798770.png' },
            { name: 'Adjustable Ankle Weights', image: '/product-images/adjustable_ankle_weights_1768594811940.png' },
            { name: 'Sports Gym Bag', image: '/product-images/sports_gym_bag_1768594825366.png' },
        ];

        let updatedCount = 0;
        for (const update of imageUpdates) {
            const result = await Product.updateOne(
                { name: update.name },
                { $set: { image: update.image } }
            );
            if (result.modifiedCount > 0) {
                updatedCount++;
                console.log(`Updated: ${update.name}`);
            }
        }

        console.log(`\nSuccessfully fixed ${updatedCount} mismatched product images!`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

fixMismatchedImages();
