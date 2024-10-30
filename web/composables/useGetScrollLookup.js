import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useGetScrollLookup = (targets, { start, pinnedContainer, containerAnimation }) => {

	let triggers = gsap.utils.toArray(targets).map((el) =>
		ScrollTrigger.create({
			trigger: el,
			start: start || "top top",
			pinnedContainer: pinnedContainer,
			refreshPriority: -10,
			containerAnimation: containerAnimation,
		})
  	),
	st = containerAnimation && containerAnimation.scrollTrigger;
	return (target) => {
		let t = gsap.utils.toArray(target)[0],
		i = triggers.length;
		while (i-- && triggers[i].trigger !== t) {}
  		if (i < 0) {
			return console.warn("target not found", target);
  		}
  		return containerAnimation ? st.start + (triggers[i].start / containerAnimation.duration()) * (st.end - st.start) : triggers[i].start;
	}

}