<template>
	<div>
		<PageTitle :title="data.aboutPage.title" />
		<div class="introduction" v-if="data.aboutPage.aboutText?.length">
			<RichText :blocks="data.aboutPage.aboutText" />
		</div>
		<div class="team" v-if="data.team?.length">
			<h2 class="section-title">Team</h2>
			<div class="team-layout">
				<div v-for="member in data.team" class="member" :key="member._id">
					<ImgWithRatio 
						:src="member.image.asset.url" 
						:sizes="`
							(max-width: 768px) 50vw, 
							(min-width: 768px) and (max-width: 1023px) 33vw, 
							(min-width: 1024px) and (max-width: 1200px) 25vw, 
							20vw`"
						:alt="member.image.alt" 
						:ratio="`3.1 / 3.88`"
						v-if="member.image?.asset"
					/>
					<div class="titles">
						<h3 class="name">{{ member.title }}</h3>
						<h4 class="position" v-if="member.position">{{ member.position }}</h4>
					</div>
				</div>
			</div>
		</div>
		<div class="clients" v-if="data.aboutPage.clients?.length">
			<h2 class="section-title">Selected Clients</h2>
			<div class="sectors-clients">
				<div v-for="(sector, index) in data.aboutPage.clients" :key="index" class="sector" :class="{ '--open': openedClientSectors.includes(index) }">
					<h3><button @click="toggleClientSector(index)"><SymbolArrowDown /><span>{{ sector.title }}</span></button></h3>
					<ul class="clients" v-show="openedClientSectors.includes(index)">
						<li v-for="client in sector.clients" :key="client.name">{{ client.name }}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"aboutPage": *[_type == "aboutPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		aboutText[] {
			${$richTextQuery}
		},
		clients[] {
			title,
			clients[] {
				name,
			},
		},
	}[0],

	"team": *[_type == "teamMember"] | order(orderRank) {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		position,
		image {
			${$imageQuery}
		},
	},
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.aboutPage)

useHead({
	title: title.value,
	meta: useSeoFields({
		title: title.value,
		description: description.value,
		image: image.value
	}),
	bodyAttrs: {
		class: bodyClass.value
	}
})

const openedClientSectors = ref([])

const toggleClientSector = (index) => {
	if (openedClientSectors.value.includes(index)) {
		openedClientSectors.value = openedClientSectors.value.filter(i => i !== index)
	} else {
		openedClientSectors.value.push(index)
	}
}

</script>

<style lang="scss" scoped>

div.introduction {
	display: grid;
	grid-template-columns: repeat(15, 1fr);
	column-gap: var(--padding-base);
	padding: 0 var(--padding-base);
	font-size: 24px;
	line-height: 1.45;
	> * {
		grid-column: 4 / span 9;
	}
}
div.team {
	position: relative;
	margin-top: calc(var(--padding-base) * 2);
	padding-top: calc(var(--padding-base) * 2);
	&:before {
		content: '';
		grid-column: 1 / -1;
		display: block;
		height: 1px;
		width: calc(100% + (var(--padding-base) * 2));
		position: absolute;
		top: 0;
		left: calc(-1 * var(--padding-base));
		background-color: #848484;
	}
	h2.section-title {
		font-size: var(--font-size-lg);
		margin-bottom: calc(var(--padding-base) * 2);
		padding: 0 var(--padding-base);
	}
}
div.team-layout {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: var(--padding-base);
	padding: 0 var(--padding-base);
	@include media('tablet-landscape') {
		grid-template-columns: repeat(4, 1fr);
	}
	@include media('tablet-portrait') {
		grid-template-columns: repeat(3, 1fr);
	}
	@include media('phone') {
		grid-template-columns: 1fr 1fr;
	}
	div.member {
		display: flex;
		flex-flow: column nowrap;
		row-gap: 15px;
	}
}
div.clients {
	position: relative;
	margin-top: calc(var(--padding-base) * 2);
	padding-top: calc(var(--padding-base) * 2);
	&:before {
		content: '';
		grid-column: 1 / -1;
		display: block;
		height: 1px;
		width: calc(100% + (var(--padding-base) * 2));
		position: absolute;
		top: 0;
		left: calc(-1 * var(--padding-base));
		background-color: #848484;
	}
	h2.section-title {
		font-size: var(--font-size-lg);
		margin-bottom: calc(var(--padding-base) * 2);
		padding: 0 var(--padding-base);
	}
	div.sectors-clients {
		display: flex;
		flex-flow: column nowrap;
		row-gap: var(--padding-base);
		padding: 0 var(--padding-base);
		div.sector {
			&.--open {
				h3 {
					button {
						svg {
							transform: rotateX(180deg);
						}
					}
				}
			}
			h3 {
				font-size: var(--font-size-lg);
				button {
					all: unset;
					box-sizing: border-box;
					cursor: pointer;
					display: inline-flex;
					flex-flow: row nowrap;
					column-gap: var(--padding-base);
					align-items: center;
					svg {
						height: 35px;
						width: 25px;
					}
				}
			}
			ul.clients {
				display: flex;
				flex-flow: column nowrap;
				gap: var(--padding-base);
				margin-top: var(--padding-base);
				li {
					font-size: var(--font-size-lg);
					color: #8b8b8a;
				}
			}
		}
	}
}

</style>