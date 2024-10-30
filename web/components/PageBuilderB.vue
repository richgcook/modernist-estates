<template>
	<div class="blocks-layout">

		<div v-for="(block, index) in content" :key="index" class="block" ref="blocks" :data-type="useBlockType(block._type)">

			<template v-if="useBlockType(block._type) == 'text'">
				<h3 class="heading" :class="{ '--centered': block.heading.alignCenter }" v-if="block.heading?.text">{{ block.heading.text }}</h3>
				<RichText :blocks="block.text" :data-column-count="block.textColumnCount" />
			</template>

			<template v-else-if="useBlockType(block._type) == 'media-and-text' && block.media?.length">

				<div class="layout" :data-text-column-count="block.settings.textColumnCount" :data-ghost-column="block.settings.ghostColumn ? block.settings.ghostColumn : null" :data-media-position="block.settings.mediaPosition">

					<div class="block" data-type="media">
						<SliderA 
							:slides="block.media" 
							:isFirst="index == 0" 
							:mediaPosition="block.settings.mediaPosition"
							v-if="block.settings.mediaLayout == 'slideshow'" 
						/>
						<div class="layout" :data-type="block.settings.mediaLayout" v-else>
							<div v-for="(block, index) in block.media" :key="index">
								<template v-if="useBlockType(block._type) == 'image'">
									<ImgWithRatio 
										:src="block.image.asset.url"
										:alt="block.image.alt"
										:ratio="block.image.asset.ratio"
										v-if="block.image"
									/>
								</template>
								<template v-else-if="useBlockType(block._type) == 'video'">
									<video playsinline loop muted autoplay>
										<source :src="block.video" type="video/mp4">
									</video>
								</template>
								<template v-else-if="useBlockType(block._type) == 'embed'">
									<VideoEmbed 
										:poster="block.coverImage" 
										:html="block.embedCode" 
									/>
								</template>
							</div>
						</div>
					</div>
					<div class="block" data-type="text">
						<div class="inner">
							<div class="project-details" v-if="project && index == 0">
								<h2>{{ project.title }}</h2>
								<CategoriesForProjects :categories="project.categories" :context="`project`" v-if="project.categories?.length" />
							</div>
							<RichText :blocks="block.text" />
						</div>
						<div class="projects-layout" v-if="project && block.relatedProjects?.length">
							<h3>Related projects</h3>
							<ProjectItem v-for="project in block.relatedProjects" :key="project._id" :project="project" :size="`sm`" />
						</div>
					</div>
				</div>

			</template>

		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	content: Array,
	project: Object,
})

</script>

<style lang="scss" scoped>

div.blocks-layout {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: var(--padding-base);
	padding: 0 var(--padding-base);
	@include media('phone') {
		grid-template-columns: 1fr;
	}
	> div.block {
		&[data-type="media-and-text"] {
			grid-column: 1 / -1;
			> div.layout {
				display: grid;
				grid-template-columns: repeat(12, 1fr);
				gap: var(--padding-base);
				@include media('phone') {
					grid-template-columns: 1fr;
				}
				&[data-text-column-count="1"] {
					&[data-media-position="left"] {
						> div.block {
							&[data-type="text"] {
								grid-column: 10 / -1;
								grid-row: 1;
								@include media('phone') {
									grid-column: 1 / -1;
									grid-row: auto;
								}
							}
							&[data-type="media"] {
								grid-column: 1 / span 9;
								grid-row: 1;
								@include media('phone') {
									grid-column: 1 / -1;
									grid-row: auto;
								}
							}
						}
					}
					&[data-media-position="right"] {
						> div.block {
							&[data-type="text"] {
								grid-column: 1 / span 3;
								grid-row: 1;
								@include media('phone') {
									grid-column: 1 / -1;
									grid-row: auto;
								}
							}
							&[data-type="media"] {
								grid-column: 4 / -1;
								grid-row: 1;
								@include media('phone') {
									grid-column: 1 / -1;
									grid-row: auto;
								}
							}
						}
					}
					> div.block {
						&[data-type="text"] {
							grid-column: 1 / span 3;
							@include media('phone') {
								grid-column: 1 / -1;
							}
						}
						&[data-type="media"] {
							grid-column: 4 / -1;
							@include media('phone') {
								grid-column: 1 / -1;
							}
						}
					}
				}
				&[data-text-column-count="2"] {
					&[data-ghost-column] {
						> div.block {
							&[data-type="text"] {
								div.text {
									column-count: 1;
									max-width: calc(50% - 5px);
								}
							}
						}
					}
					&[data-media-position="left"] {
						> div.block {
							&[data-type="text"] {
								grid-column: 7 / span -1;
								grid-row: 1;
								@include media('phone') {
									grid-column: 1 / -1;
									grid-row: auto;
								}
							}
							&[data-type="media"] {
								grid-column: 1 / span 6;
								grid-row: 1;
								@include media('phone') {
									grid-column: 1 / -1;
									grid-row: auto;
								}
							}
						}
					}
					&[data-media-position="right"] {
						> div.block {
							&[data-type="text"] {
								grid-column: 1 / span 6;
								grid-row: 1;
								@include media('phone') {
									grid-column: 1 / -1;
									grid-row: auto;
								}
							}
							&[data-type="media"] {
								grid-column: 7 / -1;
								grid-row: 1;
								@include media('phone') {
									grid-column: 1 / -1;
									grid-row: auto;
								}
							}
						}
					}
					> div.block {
						&[data-type="text"] {
							grid-column: 7 / -1;
							@include media('phone') {
								grid-column: 1 / -1;
							}
							div.text {
								column-count: 2;
								gap: var(--padding-base);
								@include media('phone') {
									column-count: 1;
								}
								:deep(> *) {
									break-inside: avoid-column;
									max-width: calc(100% - (var(--padding-base) * 2));
								}
							}
						}
						&[data-type="media"] {
							grid-column: 1 / span 6;
							@include media('phone') {
								grid-column: 1 / -1;
							}
						}
					}
				}
				> div.block {
					&[data-type="text"] {
						display: grid;
						align-content: space-between;
						div.inner {
							div.project-details {
								display: flex;
								flex-flow: column nowrap;
								gap: 5px;
								margin-bottom: calc(var(--padding-base) * 2);
								h2 {
									font-size: 28px;
								}
							}
						}
						div.projects-layout {
							display: grid;
							grid-template-columns: 1fr 1fr;
							gap: var(--padding-base);
							margin-top: calc(var(--padding-base) * 2);
							max-width: calc(((100vw / 12) * 3) - var(--padding-base));
							> h3 {
								grid-column: 1 / -1;
								font-size: 14px;
								text-transform: uppercase;
							}
						}
					}
					&[data-type="media"] {
						> div.layout {
							&[data-type="grid"] {
								display: grid;
								grid-template-columns: 1fr 1fr;
								gap: var(--padding-base);
								> div {
									&:nth-child(1) {
										grid-column: 1 / -1;
									}
								}
							}
							&[data-type="stacked"] {
								display: grid;
								gap: var(--padding-base);
							}
							> div {
								div.image, 
								video {
									border-radius: 5px;
									overflow: hidden;
								}
							}
						}
					}
				}
			}
		}
		&[data-type="text"] {
			grid-column: 4 / span 6;
			display: grid;
    		row-gap: 1rem;
			padding: 20vh 0;
			@include media('phone') {
				grid-column: 1 / -1;
				padding: 10vh 0;
			}
			h3.heading {
				font-size: 28px;
				line-height: 1.1;
				&.--centered {
					text-align: center;
				}
				@include media('phone') {
					font-size: 25px;
				}
			}
			div.text {
				&[data-column-count="2"] {
					column-count: 2;
					gap: var(--padding-base);
					@include media('phone') {
						column-count: 1;
					}
					:deep(> *) {
						break-inside: avoid-column;
						max-width: calc(100% - (var(--padding-base) * 2));
					}
				}
			}
		}
	}
}

</style>