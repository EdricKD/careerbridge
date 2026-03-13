insert into public.badges (name, description, icon, criteria)
values
  ('First Application', 'Submitted your first shadowing application.', 'Rocket', 'Submit one shadowing application'),
  ('Profile Complete', 'Completed every core section of your student profile.', 'BadgeCheck', 'Complete onboarding and upload a profile summary'),
  ('AI Explorer', 'Held five AI career companion conversations.', 'Sparkles', 'Complete 5 AI chats'),
  ('Shadowing Pioneer', 'Finished your first job shadowing experience.', 'Mountain', 'Complete one shadowing placement'),
  ('Consistency King', 'Logged in for seven days in a row.', 'Flame', 'Maintain a 7-day login streak'),
  ('Skill Builder', 'Added and tracked 10 or more career skills.', 'Hammer', 'Add 10 skills to your profile')
on conflict (name) do nothing;
