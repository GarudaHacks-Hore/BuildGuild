'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
	bio: z.string().min(5),
	skills: z.string().min(5),
	life_story: z.string().min(5),
	biggest_struggle: z.string().min(5),
	job_wishlist: z.string().min(5).optional(),
	collaborator: z.string().min(5).optional(),
});

export default function Update() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);

		const { data, error } = await supabase
			.from('profiles')
			.update({
				...values,
			})
			.eq('email', (await supabase.auth.getUser()).data.user?.email)
			.select();

		if (!error) {
			toast({
				title: 'Profile updated!',
				variant: 'default',
			});
			router.push('/discover');
		} else {
			toast({
				title: 'Something went wrong!',
				description: error.message,
				variant: 'destructive',
			});
		}
	}

	return (
		<main className="flex flex-col mx-72 mt-4 gap-8 h-full mb-8">
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold">Getting to know you!</h1>
				<p>Although you can find other users, currently nobody can find you :&#40;</p>
				<p>
					To fix this issue, you need to provide extra information to us so that our smart
					AI can know who you are!
				</p>
				<p>Once you&apos;ve done, you can:</p>
				<p>- Be discovered by other users</p>
				<p>- Send messages to fellow creatives</p>
				<p>- Have a publicly viewable profile!</p>
				<p>
					This will take a few minutes of your time (probably around 10 minutes). Although
					you might feel the urge to quickly fill out the questions, please bear in mind
					that BuildGuild can have a deeper understanding of you if you answer
					thoughtfully. We recommend you to take your time and answer the questions as
					best as you can. And please stick to 1-2 sentences that captures your essence
					the best for each question!
				</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xl font-bold">Biography</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Feel free to word vomit. Tell us about all the things ex. a new skill that took your work to the next level, a promotion you got, a big milestone you hit in terms of metrics, a round you raised, etc."
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Tell us about yourself! What are your hobbies? What do you like
									to do on your day off? What is you source of motivation?
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="skills"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xl font-bold">Skills</FormLabel>
								<FormControl>
									<Textarea
										placeholder="I'm confident as a swift ios dev because i've built like 10 apps. I'm good at marketing + google ads because i've ran massive campaigns. I am not the best designer right now, but i'm spending a lot of time working on my design skills."
										{...field}
									/>
								</FormControl>
								<FormDescription>
									When it comes to building stuff, what are you good at? What are
									you confident doing?
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="life_story"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xl font-bold">Life Story</FormLabel>
								<FormControl>
									<Textarea
										placeholder="I was born in Indonesia. I started coding in secondary school. My first programming language is Python. I joined plenty competitive programming competitions in highschool. Currently a last year at college."
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Imagine someone on the street pulls you aside and says
									&quot;What&apos;s your life story in 10-15 bullet points?&quot;
									what are your 10-15 bullets?
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="biggest_struggle"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xl font-bold">
									Biggest Struggle
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="I need a mentor or study buddy on machine learning"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									What&apos;s your biggest struggle right now in terms of your
									work / career / hobby? what do you need help with?
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="job_wishlist"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xl font-bold">Job Wishlist</FormLabel>
								<FormControl>
									<Textarea
										placeholder="I want to be a back-end engineer at Google"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									What kind of roles/jobs would you be open to? What makes you a
									good pick? If you are not looking for a job, simply skip this
									question
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="collaborator"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xl font-bold">Collaborator</FormLabel>
								<FormControl>
									<Textarea
										placeholder="I want to find people who can also use Typescript"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									What types of collaborators are you looking for. If you are not
									looking to collaborate, simply skip this question.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-center items-center">
						<Button type="submit" className="w-[33%]">
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</main>
	);
}
