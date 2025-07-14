
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('image')
        .setDescription('Display images of various animals')
        .addSubcommand(subcommand =>
            subcommand
                .setName('dog')
                .setDescription('Display a random dog image')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('cat')
                .setDescription('Display a random cat image')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('koala')
                .setDescription('Display a random koala image')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('panda')
                .setDescription('Display a random panda image')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('redpanda')
                .setDescription('Display a random red panda image')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('avatar')
                .setDescription('Display a user\'s avatar')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('User to get avatar from')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('banner')
                .setDescription('Display a user\'s banner')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('User to get banner from')
                        .setRequired(true)
                )
        ),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        try {
            switch (subcommand) {
                case 'dog':
                    await this.handleDogImage(interaction);
                    break;
                case 'cat':
                    await this.handleCatImage(interaction);
                    break;
                case 'koala':
                    await this.handleKoalaImage(interaction);
                    break;
                case 'panda':
                    await this.handlePandaImage(interaction);
                    break;
                case 'redpanda':
                    await this.handleRedPandaImage(interaction);
                    break;
                case 'avatar':
                    await this.handleAvatarImage(interaction);
                    break;
                case 'banner':
                    await this.handleBannerImage(interaction);
                    break;
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: 'An error occurred while fetching the image. Please try again later.', 
                ephemeral: true 
            });
        }
    },

    async handleDogImage(interaction) {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();

            if (data.status === 'success') {
                const embed = new EmbedBuilder()
                    .setTitle('🐕 Random Dog')
                    .setImage(data.message)
                    .setColor(0x8B4513)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
            } else {
                throw new Error('Failed to fetch dog image');
            }
        } catch (error) {
            await interaction.reply({ 
                content: 'Failed to fetch a dog image. Please try again later.', 
                ephemeral: true 
            });
        }
    },

    async handleCatImage(interaction) {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();

            if (data && data[0] && data[0].url) {
                const embed = new EmbedBuilder()
                    .setTitle('🐱 Random Cat')
                    .setImage(data[0].url)
                    .setColor(0xFF69B4)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
            } else {
                throw new Error('Failed to fetch cat image');
            }
        } catch (error) {
            await interaction.reply({ 
                content: 'Failed to fetch a cat image. Please try again later.', 
                ephemeral: true 
            });
        }
    },

    async handleKoalaImage(interaction) {
        try {
            const response = await fetch('https://some-random-api.com/animal/koala');
            const data = await response.json();

            if (data && data.image) {
                const embed = new EmbedBuilder()
                    .setTitle('🐨 Random Koala')
                    .setImage(data.image)
                    .setColor(0x708090)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
            } else {
                throw new Error('Failed to fetch koala image');
            }
        } catch (error) {
            await interaction.reply({ 
                content: 'Failed to fetch a koala image. Please try again later.', 
                ephemeral: true 
            });
        }
    },

    async handlePandaImage(interaction) {
        try {
            const response = await fetch('https://some-random-api.com/animal/panda');
            const data = await response.json();

            if (data && data.image) {
                const embed = new EmbedBuilder()
                    .setTitle('🐼 Random Panda')
                    .setImage(data.image)
                    .setColor(0x000000)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
            } else {
                throw new Error('Failed to fetch panda image');
            }
        } catch (error) {
            await interaction.reply({ 
                content: 'Failed to fetch a panda image. Please try again later.', 
                ephemeral: true 
            });
        }
    },

    async handleRedPandaImage(interaction) {
        try {
            const response = await fetch('https://some-random-api.com/animal/red_panda');
            const data = await response.json();

            if (data && data.image) {
                const embed = new EmbedBuilder()
                    .setTitle('🦝 Random Red Panda')
                    .setImage(data.image)
                    .setColor(0xFF4500)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
            } else {
                throw new Error('Failed to fetch red panda image');
            }
        } catch (error) {
            await interaction.reply({ 
                content: 'Failed to fetch a red panda image. Please try again later.', 
                ephemeral: true 
            });
        }
    },

    async handleAvatarImage(interaction) {
        const user = interaction.options.getUser('user');
        
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor(0x5865F2)
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}` });

        await interaction.reply({ embeds: [embed] });
    },

    async handleBannerImage(interaction) {
        const user = interaction.options.getUser('user');
        
        try {
            // Fetch the user to get banner information
            const fetchedUser = await user.fetch(true);
            const bannerUrl = fetchedUser.bannerURL({ dynamic: true, size: 1024 });
            
            if (!bannerUrl) {
                await interaction.reply({ 
                    content: `${user.username} doesn't have a banner set.`, 
                    ephemeral: true 
                });
                return;
            }

            const embed = new EmbedBuilder()
                .setTitle(`${user.username}'s Banner`)
                .setImage(bannerUrl)
                .setColor(0x5865F2)
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.username}` });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching user banner:', error);
            await interaction.reply({ 
                content: 'Failed to fetch user banner. Please try again later.', 
                ephemeral: true 
            });
        }
    }
};
